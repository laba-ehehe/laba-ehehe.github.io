import http.server, socketserver, os, sys
port, folder = int(sys.argv[1]), sys.argv[2]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), folder)))
class H(http.server.SimpleHTTPRequestHandler):
    # mirror GitHub Pages: /assets and /shared live at the repo root
    def translate_path(self, path):
        p = path.split('?',1)[0].split('#',1)[0]
        for pre in ('/assets/','/shared/'):
            if p.startswith(pre): return os.path.join(ROOT, p.lstrip('/'))
        return super().translate_path(path)
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store'); super().end_headers()
    def log_message(self, *a): pass
socketserver.ThreadingTCPServer.allow_reuse_address = True
socketserver.ThreadingTCPServer(('127.0.0.1', port), H).serve_forever()
