# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: UserProfile.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x11UserProfile.proto\x12\rrpcManagement\"c\n\x0bUserProfile\x12\x0e\n\x06userId\x18\x01 \x01(\t\x12\x11\n\tfirstName\x18\x02 \x01(\t\x12\x10\n\x08lastName\x18\x03 \x01(\t\x12\r\n\x05\x65mail\x18\x04 \x01(\t\x12\x10\n\x08groupIds\x18\x05 \x03(\tb\x06proto3')



_USERPROFILE = DESCRIPTOR.message_types_by_name['UserProfile']
UserProfile = _reflection.GeneratedProtocolMessageType('UserProfile', (_message.Message,), {
  'DESCRIPTOR' : _USERPROFILE,
  '__module__' : 'UserProfile_pb2'
  # @@protoc_insertion_point(class_scope:rpcManagement.UserProfile)
  })
_sym_db.RegisterMessage(UserProfile)

if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _USERPROFILE._serialized_start=36
  _USERPROFILE._serialized_end=135
# @@protoc_insertion_point(module_scope)