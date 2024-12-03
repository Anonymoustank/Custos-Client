const express = require('express');
const bodyParser = require('body-parser');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const cors = require('cors'); // Import the cors package

// Define the path to the proto file
const PROTO_PATH = path.resolve(__dirname, '../../backend1/backend1/proto/UserManagementService.proto');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Load the gRPC package
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
console.log(grpcObject); // Log the entire grpcObject to inspect its structure

const userProto = grpcObject.rpcManagement.UserManagementService;
console.log(userProto); // Log userProto to ensure it's correctly loaded

if (!userProto) {
  console.error('Failed to load UserManagementService from the protobuf definition');
  process.exit(1);
}

const client = new userProto('localhost:50051', grpc.credentials.createInsecure());

const app = express();
app.use(bodyParser.json());

// Configure CORS to allow only localhost:3000
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

app.use(cors())

app.post('/createUserProfile', (req, res) => {
  const userProfile = req.body;
  client.CreateUserProfile(userProfile, (error, response) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log(response);
      res.json(response);
    }
  });
});

app.listen(4000, () => {
  console.log('Proxy server is running on port 4000 (ensure the rpc server has also started!)');
});