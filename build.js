const cp = require('child_process')
const fs = require('fs')
const path = require('path')

const stage = process.argv[2]

if (!stage) {
  console.error('Please provide a stage name as the first argument.')
  process.exit(1)
}

if (!stage.match(/[a-zA-Z][a-zA-Z0-9/-]{0,99}/)) {
  console.error([
    'The stage name should only contain alphanumeric (case sensitive) and hyphens.',
    'It should start with an alphabetic character and shouldn\'t exceed 100 characters.',
  ].join(''))
  process.exit(2)
}

// Init & Read package.json
const reactAppPackagePath = path.join(__dirname, 'browser-client', 'package.json')
const reactAppPackageBackup = reactAppPackagePath + '.bak'
const reactAppPackage = fs.readFileSync(reactAppPackagePath, 'utf8')
const package = JSON.parse(reactAppPackage)

// Backup & Replace with updated package
const buildPackage = Object.assign({ homepage: `/${stage}/`}, package)
fs.writeFileSync(reactAppPackageBackup, reactAppPackage)
fs.writeFileSync(reactAppPackagePath, JSON.stringify(buildPackage))

// Run the app build
console.log(`Building for STAGE "${stage}"...`)
cp.execSync('npm run build', {
  cwd: path.join(__dirname, 'browser-client'),
  stdio: [0, 1, 2],
})

// Restore package
fs.writeFileSync(reactAppPackagePath, reactAppPackage)
fs.unlinkSync(reactAppPackageBackup)

// Deploy via Serverless
console.log(`Deploying STAGE "${stage}"...`)
cp.execSync(`sls deploy --stage ${stage}`, { stdio: [0, 1, 2] })

console.log('Done.')
