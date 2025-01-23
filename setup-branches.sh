#!/bin/bash

# Configuration: Define branch names
MASTER_BRANCH="master"
DEVELOPER_BRANCH="developer"
QA_BRANCH="QA"
PRE_PROD_BRANCH="pre-production"
PROD_BRANCH="production"

# Function to create a branch
create_branch() {
    local branch_name=$1
    local base_branch=$2
    echo "Creating branch '$branch_name' from '$base_branch'..."
    git checkout $base_branch || { echo "Base branch '$base_branch' not found! Exiting."; exit 1; }
    git checkout -b $branch_name
    git push origin $branch_name
    echo "Branch '$branch_name' created and pushed to remote."
}

# Function to protect a branch (requires GitHub CLI or similar tool)
protect_branch() {
    local branch_name=$1
    echo "Applying branch protection for '$branch_name'..."
    gh api -X PUT "repos/:owner/:repo/branches/$branch_name/protection" -F required_status_checks.enforcement_level="everyone" || {
        echo "Branch protection failed. Ensure GitHub CLI is authenticated and repository information is set.";
    }
}

# Main script
echo "Starting Git branching setup..."

# Check if repository is initialized
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    echo "This is not a Git repository. Initialize a Git repository before running this script."
    exit 1
fi

# Create branches
create_branch $DEVELOPER_BRANCH $MASTER_BRANCH
create_branch $QA_BRANCH $DEVELOPER_BRANCH
create_branch $PRE_PROD_BRANCH $QA_BRANCH
create_branch $PROD_BRANCH $MASTER_BRANCH

# Apply branch protection (requires GitHub CLI)
read -p "Do you want to apply branch protection rules? (y/n): " apply_protection
if [[ $apply_protection == "y" ]]; then
    protect_branch $MASTER_BRANCH
    protect_branch $DEVELOPER_BRANCH
    protect_branch $QA_BRANCH
    protect_branch $PRE_PROD_BRANCH
    protect_branch $PROD_BRANCH
fi

echo "Git branching setup completed."
