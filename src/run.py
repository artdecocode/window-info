import sys
import Quartz
import json

def gen_ids_from_info(windows):
    for win_dict in windows:
        num = win_dict.get('kCGWindowNumber', '')
        owner = win_dict.get('kCGWindowOwnerName', '')
        name = win_dict.get('kCGWindowName', '')
        pid = win_dict.get('kCGWindowOwnerPID', '')

        yield num, owner, name, pid

def run():
    windows = Quartz.CGWindowListCopyWindowInfo(
        Quartz.kCGWindowListOptionOnScreenOnly,
        Quartz.kCGNullWindowID
    )

    winList = list(gen_ids_from_info(windows))
    print >> sys.stderr, json.dumps(winList)

c = len(sys.argv) < 2

if c:
    run()
else:
    while 1:
        sys.stdin.readline()
        run()
