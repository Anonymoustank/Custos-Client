import threading
import subprocess
import signal
import os
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Run the gRPC server in a separate thread'

    def handle(self, *args, **kwargs):
        def run_grpc_server():
            process = subprocess.Popen(['python', 'backend1/server.py'])
            process.wait()

        grpc_thread = threading.Thread(target=run_grpc_server)
        grpc_thread.start()

        # Ensure the gRPC server stops when the Django process ends
        def stop_grpc_server(signal, frame):
            os.kill(process.pid, signal.SIGINT)
            grpc_thread.join()

        signal.signal(signal.SIGINT, stop_grpc_server)
        signal.signal(signal.SIGTERM, stop_grpc_server)

        self.stdout.write(self.style.SUCCESS('gRPC server started in a separate thread'))