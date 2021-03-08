#!/bin/sh
if [ "$1" = "new" ]
then
    git acm -m "📦NEW: $2"
elif [ "$1" = "feature" ]
then
    git acm -m "💡FEATURE: $2"
elif [ "$1" = "fix" ]
then
    git acm -m "🪑HOTFIX: $2"
elif [ "$1" = "lib" ]
then
    git acm -m "📜LIBRARY: $2"
fi