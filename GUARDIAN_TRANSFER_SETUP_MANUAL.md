# 📘 GUARDIAN TRANSFER & SETUP MANUAL

**Version:** 1.0  
**Author:** Joshua  
**Brand:** GUARDIAN — Network Vulnerability & Compliance Scanner  
**Date:** July 2026

## 1. Overview

This manual provides a chronological workflow for transferring the Guardian vulnerability scanner app from one computer to another while preserving functionality, dependencies, and configuration integrity.

## 2. Required Materials

- Access to source computer
- USB drive or cloud storage
- Destination laptop
- Ability to install dependencies
- Administrative privileges

## 3. Transfer Procedure

### 3.1 Identify Required Files

Gather:

- Guardian source code folder
- Configuration files (`config.json`, `.env`, `.yaml`)
- Dependency lists (`requirements.txt`, `package.json`)
- Build artifacts (executables/installers)
- Database files (if applicable)
- Documentation

### 3.2 Compress the Project

1. Right-click the Guardian folder.
2. Select **Send to → Compressed (zipped) folder**.
3. Name it: `GuardianApp.zip`.

### 3.3 Transfer the Zip File

Use one of:

- USB drive (recommended)
- OneDrive / Google Drive / Dropbox
- Local network transfer (SMB/SCP)

### 3.4 Extract on Destination

1. Copy `GuardianApp.zip`.
2. Right-click and select **Extract All**.
3. Verify all files are present.

## 4. Environment Setup

### 4.1 Verify Runtime Versions

```bash
python --version
node --version
powershell --version
```

### 4.2 Install Dependencies

Python:

```bash
pip install -r requirements.txt
```

Node.js:

```bash
npm install
```

Compiled applications:

- Ensure required runtimes/frameworks are installed.

## 5. Functional Verification

### 5.1 Launch Guardian

- Run the executable or script.

### 5.2 Test Core Functions

Verify:

- Network scanning
- Vulnerability detection
- Remediation output
- Compliance mapping
- Report generation

### 5.3 Troubleshooting Checks

Check:

- Missing libraries
- Environment variables
- File paths
- Dependency installation

## 6. Version Control Setup (Optional)

### 6.1 Initialize Git

```bash
git init
git add .
git commit -m "Guardian initial version"
```

### 6.2 Push to GitHub (Private Repository)

```bash
git remote add origin https://github.com/yourusername/guardian.git
git push -u origin main
```

## 7. Integrity Check

### 7.1 Generate SHA-256 Hash

```bash
certutil -hashfile GuardianApp.zip SHA256
```

### 7.2 Compare Hashes

- Matching hashes indicate a clean transfer.

## 8. Troubleshooting Appendix

### 8.1 Missing Dependencies

Symptoms:

- App fails to launch
- `Module not found` errors

Fix:

```bash
pip install -r requirements.txt
npm install
```

### 8.2 Broken Paths

Symptoms:

- Scanner cannot find config files
- Reports fail to generate

Fix:

- Update file paths in config
- Ensure relative paths are correct

### 8.3 Environment Variable Issues

Symptoms:

- API keys missing
- Compliance modules fail

Fix:

- Recreate `.env` file
- Re-enter keys securely

### 8.4 Permission Errors

Symptoms:

- Scanner cannot access network interfaces
- Cannot write reports

Fix:

- Run as administrator
- Adjust folder permissions

### 8.5 Corrupted Zip File

Symptoms:

- Extraction errors
- Missing files

Fix:

- Re-zip the folder
- Re-transfer using USB

## 9. Notes & Best Practices

- Always keep a backup copy
- Never modify config files on the source machine
- Keep dependencies updated
- Use GitHub for long-term version control
- Store sensitive keys in `.env` files

## 10. Table of Figures

1. Guardian Branding Shield
2. Project Folder Structure
3. Dependency Installation Workflow
4. Git Version Control Flow
5. SHA-256 Integrity Check
