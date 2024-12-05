# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: UserManagementService.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import UserProfile_pb2 as UserProfile__pb2
from google.protobuf import empty_pb2 as google_dot_protobuf_dot_empty__pb2
import Group_pb2 as Group__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1bUserManagementService.proto\x12\rrpcManagement\x1a\x11UserProfile.proto\x1a\x1bgoogle/protobuf/empty.proto\x1a\x0bGroup.proto\"1\n\tGroupList\x12$\n\x06groups\x18\x01 \x03(\x0b\x32\x14.rpcManagement.Group2\xf1\x04\n\x15UserManagementService\x12K\n\x11\x43reateUserProfile\x12\x1a.rpcManagement.UserProfile\x1a\x1a.rpcManagement.UserProfile\x12H\n\x0eGetUserProfile\x12\x1a.rpcManagement.UserProfile\x1a\x1a.rpcManagement.UserProfile\x12K\n\x11UpdateUserProfile\x12\x1a.rpcManagement.UserProfile\x1a\x1a.rpcManagement.UserProfile\x12G\n\x11\x44\x65leteUserProfile\x12\x1a.rpcManagement.UserProfile\x1a\x16.google.protobuf.Empty\x12\x39\n\x0b\x43reateGroup\x12\x14.rpcManagement.Group\x1a\x14.rpcManagement.Group\x12\x36\n\x08GetGroup\x12\x14.rpcManagement.Group\x1a\x14.rpcManagement.Group\x12\x39\n\x0bUpdateGroup\x12\x14.rpcManagement.Group\x1a\x14.rpcManagement.Group\x12;\n\x0b\x44\x65leteGroup\x12\x14.rpcManagement.Group\x1a\x16.google.protobuf.Empty\x12@\n\x0cGetAllGroups\x12\x16.google.protobuf.Empty\x1a\x18.rpcManagement.GroupListb\x06proto3')



_GROUPLIST = DESCRIPTOR.message_types_by_name['GroupList']
GroupList = _reflection.GeneratedProtocolMessageType('GroupList', (_message.Message,), {
  'DESCRIPTOR' : _GROUPLIST,
  '__module__' : 'UserManagementService_pb2'
  # @@protoc_insertion_point(class_scope:rpcManagement.GroupList)
  })
_sym_db.RegisterMessage(GroupList)

_USERMANAGEMENTSERVICE = DESCRIPTOR.services_by_name['UserManagementService']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _GROUPLIST._serialized_start=107
  _GROUPLIST._serialized_end=156
  _USERMANAGEMENTSERVICE._serialized_start=159
  _USERMANAGEMENTSERVICE._serialized_end=784
# @@protoc_insertion_point(module_scope)
