#!/usr/bin/env bash
# Exit immediately if any command fails
set -o errexit
set -o nounset
set -o pipefail

# Clear pip cache
pip cache purge

# Install dependencies with hash checking
pip install --require-hashes -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput --clear

# Apply database migrations
python manage.py migrate --noinput

# Optional: Create cache table if using database caching
python manage.py createcachetable