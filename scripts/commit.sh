#!/bin/sh
if [ "$1" = "new" ]
then
    git acm -m "📦NEW: $2"
elif [ "$1" = "feat" ]
then
    git acm -m "💡FEATURE: $2"
elif [ "$1" = "fix" ]
then
    git acm -m "🪑HOTFIX: $2"
elif [ "$1" = "update" ]
then
    git acm -m "🔌UPDATE: $2"
fi