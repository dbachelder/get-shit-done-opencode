#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ASCII Banner
const banner = `
   ██████╗ ███████╗██████╗ 
  ██╔════╝ ██╔════╝██╔══██╗
  ██║  ███╗███████╗██║  ██║
  ██║   ██║╚════██║██║  ██║
  ╚██████╔╝███████║██████╔╝
   ╚═════╝ ╚══════╝╚═════╝  for
                                    ▄     
  █▀▀█ █▀▀█ █▀▀█ █▀▀▄  █▀▀▀ █▀▀█ █▀▀█ █▀▀█
  █░░█ █░░█ █▀▀▀ █░░█  █░░░ █░░█ █░░█ █▀▀▀
  ▀▀▀▀ █▀▀▀ ▀▀▀▀ ▀  ▀  ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀
`;

// Configuration
const GLOBAL_TARGET = path.join(process.env.HOME, '.config', 'opencode');
const LOCAL_TARGET = path.join(process.cwd(), '.opencode');
const GLOBAL_PATH_PREFIX = '~/.config/opencode/gsd';
const LOCAL_PATH_PREFIX = './.opencode/gsd';

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  if (args.includes('--global') || args.includes('-g')) {
    return 'global';
  }
  if (args.includes('--local') || args.includes('-l')) {
    return 'local';
  }
  return null;
}

// Prompt user for installation location
async function promptForLocation() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log('\nWhere would you like to install GSD?');
    console.log('  1. Global (~/.config/opencode/) - Available in all projects');
    console.log('  2. Local (./.opencode/) - Only in this project');
    console.log('');
    
    rl.question('Enter choice (1 or 2): ', (answer) => {
      rl.close();
      if (answer.trim() === '2') {
        resolve('local');
      } else {
        resolve('global');
      }
    });
  });
}

// Recursively copy directory
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Replace path prefixes in all .md files
function replacePathsInDir(dir, pathPrefix) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      replacePathsInDir(fullPath, pathPrefix);
    } else if (entry.name.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // Replace the placeholder with the actual path
      content = content.replace(/\{\{GSD_PATH\}\}/g, pathPrefix);
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

// Check if Context7 is already configured in opencode.json
function checkContext7Config(configPath) {
  if (!fs.existsSync(configPath)) {
    return false;
  }
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return config.mcp && config.mcp.context7;
  } catch {
    return false;
  }
}

// Print next steps guidance
function printNextSteps(location, packageRoot) {
  const configPath = location === 'global' 
    ? path.join(GLOBAL_TARGET, 'opencode.json')
    : path.join(LOCAL_TARGET, 'opencode.json');
  
  const hasContext7 = checkContext7Config(configPath);
  
  console.log('\n' + '='.repeat(50));
  console.log('Next steps:');
  console.log('='.repeat(50));
  
  if (!hasContext7) {
    console.log(`
1. Add Context7 MCP to your config (for research commands):
   
   Edit ${location === 'global' ? '~/.config/opencode/opencode.json' : '.opencode/opencode.json'} and add:
   
   {
     "mcp": {
       "context7": {
         "type": "remote",
         "url": "https://mcp.context7.com/mcp"
       }
     }
   }
   
   See: ${path.join(packageRoot, 'opencode.sample.json')} for reference`);
  } else {
    console.log('\n1. Context7 MCP already configured');
  }
  
  console.log(`
2. (Optional) Copy AGENTS.sample.md content to your project's AGENTS.md
   See: ${path.join(packageRoot, 'AGENTS.sample.md')}

3. Run /gsd/help to see all commands`);
  
  console.log('\n' + '='.repeat(50));
  console.log('Start with: /gsd/new-project');
  console.log('='.repeat(50) + '\n');
}

// Main installation function
async function install() {
  console.log(banner);
  
  // Determine installation location
  let location = parseArgs();
  if (!location) {
    location = await promptForLocation();
  }
  
  const targetDir = location === 'global' ? GLOBAL_TARGET : LOCAL_TARGET;
  const pathPrefix = location === 'global' ? GLOBAL_PATH_PREFIX : LOCAL_PATH_PREFIX;
  
  console.log(`\nInstalling to: ${targetDir}`);
  
  // Get the package root directory
  const packageRoot = path.join(__dirname, '..');
  
  // Create target directory
  fs.mkdirSync(targetDir, { recursive: true });
  
  // Copy command/gsd/ to target/command/gsd/
  const commandSrc = path.join(packageRoot, 'command', 'gsd');
  const commandDest = path.join(targetDir, 'command', 'gsd');
  
  if (fs.existsSync(commandSrc)) {
    console.log('  Copying commands...');
    copyDir(commandSrc, commandDest);
    replacePathsInDir(commandDest, pathPrefix);
  }
  
  // Copy gsd/ to target/gsd/
  const gsdSrc = path.join(packageRoot, 'gsd');
  const gsdDest = path.join(targetDir, 'gsd');
  
  if (fs.existsSync(gsdSrc)) {
    console.log('  Copying skill files...');
    copyDir(gsdSrc, gsdDest);
    replacePathsInDir(gsdDest, pathPrefix);
  }
  
  console.log('\nInstalled GSD commands to ' + commandDest);
  console.log('Installed GSD skills to ' + gsdDest);
  
  // Print next steps
  printNextSteps(location, packageRoot);
}

// Run installer
install().catch((err) => {
  console.error('Installation failed:', err.message);
  process.exit(1);
});
