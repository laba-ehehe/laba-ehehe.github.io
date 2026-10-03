#!/bin/bash
# starts every prototype on its own port (8101-8130)
cd "$(dirname "$0")"
i=1
for p in p1-os p2-magical p3-room p4-pixel p5-scrapbook p6-editorial p6b-editorial-soft p3b-bag p3c-room-v2 p7-boba-shop c1-planets c2-novel c3-cards c4-purikura c5-train c6-handheld c7-phone c8-farm c9-punk c10-cute c11-y2k c12-brick c13-chrome c14-aero c15-zine c16-os9 c17-film c18-term c19-vinyl c20-vintage ios; do
  nohup python3 serve.py $((8100+i)) $p >/dev/null 2>&1 &
  echo "$p -> http://localhost:$((8100+i))"
  i=$((i+1))
done
