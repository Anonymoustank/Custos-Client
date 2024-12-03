import grpc
from concurrent import futures
import threading
import subprocess
import signal
import os
import sys
import UserManagementService_pb2_grpc
import UserProfile_pb2
import Group_pb2
from google.protobuf.empty_pb2 import Empty

class UserManagementServiceServicer(UserManagementService_pb2_grpc.UserManagementServiceServicer):
    def __init__(self):
        self.users = []
        self.groups = []

    def CreateUserProfile(self, request, context):
        self.users.append(request)
        return request

    def GetUserProfile(self, request, context):
        user = next((u for u in self.users if u.userId == request.userId), None)
        if user:
            return user
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details('User not found')
        return UserProfile_pb2.UserProfile()

    def UpdateUserProfile(self, request, context):
        user = next((u for u in self.users if u.userId == request.userId), None)
        if user:
            self.users.remove(user)
            self.users.append(request)
            return request
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details('User not found')
        return UserProfile_pb2.UserProfile()

    def DeleteUserProfile(self, request, context):
        user = next((u for u in self.users if u.userId == request.userId), None)
        if user:
            self.users.remove(user)
            return Empty()
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details('User not found')
        return Empty()

    def CreateGroup(self, request, context):
        self.groups.append(request)
        return request

    def GetGroup(self, request, context):
        group = next((g for g in self.groups if g.groupId == request.groupId), None)
        if group:
            return group
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details('Group not found')
        return Group_pb2.Group()

    def UpdateGroup(self, request, context):
        group = next((g for g in self.groups if g.groupId == request.groupId), None)
        if group:
            self.groups.remove(group)
            self.groups.append(request)
            return request
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set.details('Group not found')
        return Group_pb2.Group()

    def DeleteGroup(self, request, context):
        group = next((g for g in self.groups if g.groupId == request.groupId), None)
        if group:
            self.groups.remove(group)
            return Empty()
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set.details('Group not found')
        return Empty()

def run_django_server():
    # Use the full path to the Python interpreter
    python_executable = sys.executable
    process = subprocess.Popen([python_executable, '../../manage.py', 'runserver'])
    process.wait()

def stop_django_server(signal, frame):
    if django_process:
        django_process.terminate()
        django_process.wait()

def serve():
    # Start Django server in a separate thread
    django_thread = threading.Thread(target=run_django_server)
    django_thread.start()

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    UserManagementService_pb2_grpc.add_UserManagementServiceServicer_to_server(UserManagementServiceServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

    # Ensure the Django server stops when the gRPC server stops
    signal.signal(signal.SIGINT, stop_django_server)
    signal.signal(signal.SIGTERM, stop_django_server)

if __name__ == '__main__':
    serve()