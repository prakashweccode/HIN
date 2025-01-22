#!/bin/bash

# Branch names for environments
BRANCHES=("master" "developer" "QA" "pre-production" "production")

# Function to create branches
create_branches() {
  for BRANCH in "${BRANCHES[@]}"; do
    # Check if the branch already exists
    if git show-ref --verify --quiet refs/heads/$BRANCH; then
      echo "Branch '$BRANCH' already exists, skipping..."
    else
      # Create the branch and push to remote
      git checkout -b $BRANCH
      git push origin $BRANCH
      echo "Branch '$BRANCH' created and pushed to remote."
    fi
  done
}

# Ensure the user is in the main branch (default branch)
git checkout main || git checkout master

# Create branches
create_branches
