const cp = require('child_process')
const fs = require('fs')
const path = require('path')

const stage = process.argv[2] || '.'

if (!stage.match(/(\.|[a-zA-Z][a-zA-Z0-9/-]{0,99})/)) {
  console.error([
    'The stage name should only contain alphanumeric (case sensitive) and hyphens.',
    'It should start with an alphabetic character and shouldn\'t exceed 100 characters.',
  ].join('\n'))
  process.exit(1)
}

// Init & read package.json
const reactAppPackagePath = path.join(__dirname, 'browser-client', 'package.json')
const reactAppPackage = fs.readFileSync(reactAppPackagePath, 'utf8')
const package = JSON.parse(reactAppPackage)

// Backup & replace with updated package.json, where homepage: stage
const buildPackage = Object.assign({ homepage: `/${stage}/`}, package)
const reactAppPackageBackup = reactAppPackagePath + '.bak'
fs.writeFileSync(reactAppPackageBackup, reactAppPackage)
fs.writeFileSync(reactAppPackagePath, JSON.stringify(buildPackage))

try {
  // Run the app build
  console.log(`Building for ${stage === '.' ? 'localhost' : ` STAGE "${stage}"`}...`)
  cp.execSync('npm run build', {
    cwd: path.join(__dirname, 'browser-client'),
    stdio: [0, 1, 2],
  })
} finally {
  // Restore package
  fs.writeFileSync(reactAppPackagePath, reactAppPackage)
  fs.unlinkSync(reactAppPackageBackup)
}

console.log('Done.')
