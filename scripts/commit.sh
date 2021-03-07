#!/bin/sh
if [ "$1" = "new" ]
then
    git acm -m "📦NEW: $2"
elif [ "$1" = "feature" ]
then
    git acm -m "💡FEATURE: $2"
fi