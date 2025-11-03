# Git Workflow Guide - For Team Collaboration

## 🎯 Purpose
This guide explains how to use Git for team collaboration on the EMEXA project.

---

## 📋 Current Repository Info

- **Repository Name**: EMEXA
- **Owner**: atssamadhi
- **Current Branch**: Nippa
- **Main Branch**: (likely `main` or `master`)

---

## 🚀 Basic Git Workflow

### Daily Workflow

**1. Start Your Day - Get Latest Code**
```bash
# Make sure you're on your branch
git status

# Get latest changes from remote
git pull origin Nippa
```

**2. Make Changes - Edit Files**
```bash
# Edit files in VS Code or your editor
# Save your changes
```

**3. Check What Changed**
```bash
# See what files you modified
git status

# See detailed changes
git diff
```

**4. Stage Changes - Prepare to Commit**
```bash
# Stage specific files
git add backend/app.py
git add emexa/src/pages/Register.jsx

# Or stage all changes
git add .
```

**5. Commit Changes - Save Locally**
```bash
# Commit with a clear message
git commit -m "Added phone number field to registration"

# Good commit messages:
git commit -m "Fixed CORS error in backend"
git commit -m "Updated success message animation"
git commit -m "Added email validation"

# Bad commit messages:
git commit -m "stuff"  # ❌ Not descriptive
git commit -m "fixed bug"  # ❌ Which bug?
git commit -m "asdfasdf"  # ❌ Not helpful
```

**6. Push to Remote - Share with Team**
```bash
# Push to your branch
git push origin Nippa
```

---

## 🌿 Branch Management

### Check Current Branch
```bash
git branch
# Shows all local branches, * indicates current
```

### Create New Branch
```bash
# Create branch for new feature
git checkout -b feature-phone-number

# Naming conventions:
# feature-xyz  (for new features)
# bugfix-xyz   (for bug fixes)
# hotfix-xyz   (for urgent fixes)
```

### Switch Between Branches
```bash
# Switch to existing branch
git checkout Nippa

# Switch to main branch
git checkout main
```

### Merge Branches
```bash
# Switch to branch you want to merge INTO
git checkout main

# Merge your feature branch
git merge feature-phone-number

# If conflicts occur, resolve them and:
git add .
git commit -m "Merged feature-phone-number"
```

---

## 🔄 Common Scenarios

### Scenario 1: Made Mistake, Not Committed Yet

**Undo changes to specific file**:
```bash
# Restore file to last commit
git checkout -- backend/app.py
```

**Undo all uncommitted changes**:
```bash
# Discard all changes (careful!)
git reset --hard HEAD
```

### Scenario 2: Committed Wrong Code

**Undo last commit, keep changes**:
```bash
# Removes commit but keeps your edits
git reset --soft HEAD~1

# Now you can modify and commit again
```

**Undo last commit, discard changes**:
```bash
# Completely removes last commit (careful!)
git reset --hard HEAD~1
```

### Scenario 3: Need to Save Work But Switch Branches

```bash
# Save current work without committing
git stash

# Switch branches
git checkout other-branch

# Do work on other branch...

# Come back to original branch
git checkout Nippa

# Restore your saved work
git stash pop
```

### Scenario 4: Merge Conflicts

When two people edit the same file:

```bash
# Try to merge
git merge other-branch

# Git shows conflict markers in files:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> other-branch

# 1. Open file in editor
# 2. Decide which changes to keep
# 3. Remove conflict markers
# 4. Save file
# 5. Stage and commit
git add conflicted-file.py
git commit -m "Resolved merge conflict"
```

### Scenario 5: Accidentally Committed to Wrong Branch

```bash
# On wrong branch:
git log  # Note the commit hash (e.g., abc123)

# Switch to correct branch
git checkout correct-branch

# Apply that commit here
git cherry-pick abc123

# Go back to wrong branch
git checkout wrong-branch

# Remove the commit
git reset --hard HEAD~1
```

---

## 📦 Working with Remote Repository

### Add Remote Repository
```bash
# If not already set up:
git remote add origin https://github.com/atssamadhi/EMEXA.git

# Check remotes
git remote -v
```

### Fetch Latest from Remote
```bash
# Download changes without merging
git fetch origin

# See what's new
git log origin/main

# Merge when ready
git merge origin/main
```

### Clone Repository (First Time)
```bash
# Clone to your computer
git clone https://github.com/atssamadhi/EMEXA.git

# Navigate into it
cd EMEXA
```

---

## 👥 Team Collaboration Best Practices

### 1. Pull Before Push
```bash
# Always get latest changes first
git pull origin Nippa

# Then push your changes
git push origin Nippa
```

### 2. Commit Often, Push Regularly
```bash
# Don't wait days to commit
# Commit logical chunks of work

# Good:
git commit -m "Added phone field to model"
git commit -m "Added phone input to form"
git commit -m "Added phone validation"

# Bad:
# (3 days later)
git commit -m "Added phone stuff"  # Too vague, too big
```

### 3. Write Clear Commit Messages
```bash
# Format: <type>: <description>

# Examples:
git commit -m "feat: Added phone number to registration"
git commit -m "fix: Corrected CORS configuration"
git commit -m "docs: Updated team guide"
git commit -m "style: Improved button animations"
git commit -m "refactor: Cleaned up auth.py code"

# Types:
# feat - New feature
# fix - Bug fix
# docs - Documentation
# style - Formatting, styling
# refactor - Code restructure (no behavior change)
# test - Adding tests
# chore - Build process, dependencies
```

### 4. Use Branches for Features
```bash
# Don't work directly on main
git checkout -b feature-email-verification

# Make changes, commit, push
git push origin feature-email-verification

# When done, create Pull Request on GitHub
```

### 5. Review Before Committing
```bash
# Check what you're about to commit
git diff

# Check which files
git status

# Make sure:
# - No debug code left
# - No console.log() that should be removed
# - No commented-out code
# - No personal info (passwords, API keys)
```

---

## 🔒 What NOT to Commit

### Files to Ignore (.gitignore)

Your project should have `.gitignore` with:
```
# Python
__pycache__/
*.pyc
venv/
*.db

# Node
node_modules/
dist/
build/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### Never Commit:
- ❌ Passwords or API keys
- ❌ `node_modules/` folder
- ❌ `venv/` folder
- ❌ Database files (`.db`)
- ❌ Personal configuration files
- ❌ Build artifacts

---

## 🛠️ Useful Git Commands

### View History
```bash
# See commit history
git log

# Compact view
git log --oneline

# Graph view
git log --graph --oneline --all

# See specific file history
git log -- backend/app.py
```

### Compare Changes
```bash
# Changes not staged
git diff

# Changes staged for commit
git diff --staged

# Compare branches
git diff main..Nippa

# Compare specific file
git diff main:backend/app.py Nippa:backend/app.py
```

### Undo Changes
```bash
# Unstage file (keep changes)
git reset backend/app.py

# Discard changes to file
git checkout -- backend/app.py

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Clean Up
```bash
# Remove untracked files (dry run)
git clean -n

# Remove untracked files (for real)
git clean -f

# Remove ignored files too
git clean -fX
```

---

## 🔍 Checking Status

### Full Status
```bash
git status

# Shows:
# - Current branch
# - Changes to be committed (staged)
# - Changes not staged for commit
# - Untracked files
```

### Quick Status
```bash
git status -s

# Output:
# M  backend/app.py          # Modified, staged
#  M emexa/src/App.jsx       # Modified, not staged
# ?? newfile.py              # Untracked
```

---

## 📊 Example Team Workflow

**Developer 1 (You)**:
```bash
# Monday morning
git checkout Nippa
git pull origin Nippa

# Work on feature
# Edit files...

git add .
git commit -m "feat: Added phone number field"
git push origin Nippa

# Create Pull Request on GitHub
```

**Developer 2 (Teammate)**:
```bash
# Review your Pull Request on GitHub
# Approve or request changes

# After approval, merge to main
```

**Everyone**:
```bash
# Update their local main branch
git checkout main
git pull origin main

# Update their feature branches
git checkout their-feature-branch
git merge main
```

---

## 🚨 Emergency Commands

### "I Messed Up Everything!"
```bash
# Discard ALL local changes
git reset --hard HEAD

# Get back to exact state of remote
git fetch origin
git reset --hard origin/Nippa
```

### "I Committed Sensitive Data!"
```bash
# If NOT pushed yet:
git reset --hard HEAD~1  # Remove commit

# If ALREADY pushed:
# 1. Remove sensitive data from file
# 2. Commit the removal
# 3. Change the leaked password/key immediately
# 4. Contact team lead
```

### "I Can't Push (Rejected)"
```bash
# Someone else pushed first
# Pull their changes first:
git pull origin Nippa

# If merge conflicts, resolve them
# Then push:
git push origin Nippa
```

---

## 📝 Git Configuration

### Set Your Identity
```bash
# Set username
git config --global user.name "Your Name"

# Set email
git config --global user.email "your.email@example.com"

# Check config
git config --list
```

### Useful Aliases
```bash
# Create shortcuts
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --all"

# Now use:
git st  # instead of git status
git co main  # instead of git checkout main
git lg  # pretty log
```

---

## 🎓 Learning Resources

- **Git Docs**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **Interactive Tutorial**: https://learngitbranching.js.org/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

## ✅ Git Workflow Checklist

**Before Starting Work**:
- [ ] Pull latest changes (`git pull`)
- [ ] Create feature branch if needed
- [ ] Check you're on correct branch (`git status`)

**While Working**:
- [ ] Commit small, logical chunks
- [ ] Write clear commit messages
- [ ] Test your changes
- [ ] Don't commit sensitive data

**Before Pushing**:
- [ ] Review changes (`git diff`)
- [ ] Run project to ensure it works
- [ ] Pull latest changes again
- [ ] Resolve any conflicts
- [ ] Push to remote

**After Pushing**:
- [ ] Create Pull Request if needed
- [ ] Request review from team
- [ ] Address feedback
- [ ] Celebrate! 🎉

---

**Questions about Git?** Ask team members or check the resources above!

**Last Updated**: November 3, 2025
