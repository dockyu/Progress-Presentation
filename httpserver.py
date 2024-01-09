import http.server
import socketserver

PORT = 8000

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # 將根目錄重定向到你的reveal.js HTML檔案
        if self.path == '/':
            self.path = 'index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

# 設定伺服器參數
handler_object = MyHttpRequestHandler
my_server = socketserver.TCPServer(("", PORT), handler_object)

# 啟動伺服器
print("Server started at localhost:" + str(PORT))
my_server.serve_forever()
