#!/bin/sh
if [ "$1" = "new" ]
then
    git acm -m "📦NEW: $2"
fi