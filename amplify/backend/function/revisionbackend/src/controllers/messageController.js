const asyncHandler = require("express-async-handler");
const {graphQLQuery} = require("../helpers/graphQLQuery");

const executeQuery = async (query, dataObject, variables, req, res) => {
    console.log(req.query)
    const response = await graphQLQuery(
        query, variables,
    );


    if (response.data.errors) {
        console.log(response.data.errors);

        return res.json({
            errors: response.data.errors
        })
    }
    console.log(response.data.data)
    res.json({
        data: response.data.data[dataObject],
        body: req.body
    });
}

exports.message_detail = asyncHandler(async (req, res, next) => {
    await executeQuery(
        `query GetUserMessage($id: ID!){
          getMessage(id: $id) {
            createdAt
            id
            message
            name
            userId1
            userId2
            username1
            username2
          }
        }`,
        "getMessage",
        {id: req.params.id},
        req, res);
});


// Handle message create on POST.
exports.message_create = asyncHandler(async (req, res, next) => {
    await executeQuery(`mutation CreateMessage($message: String!, $userId1: String!, $userId2: String!, $username1: String!, $username2: String!) {
      createMessage(input: {message: $message, userId1: $userId1, userId2: $userId2, username1: $username1, username2: $username2}) {
        id,
        message,
        userId1,
        userId2,
        username1,
        username2
      }
    }`,  "createMessage",
        {
            ...req.body
        }, req, res)
});

exports.message_list = asyncHandler(async (req, res, next) => {
    await executeQuery(`query ListMessages($userId1: String!, $userId2: String!){
      listMessages(filter: {userId1: {eq: $userId1}, and: {userId2: {eq: $userId2}}}) {
        items {
          createdAt
          id
          message
          name
          updatedAt
          userId1
          userId2
          username1
          username2
        }
      }
    }
    `,  "listMessages", {...req.query}, req, res)
})

// exports.message_list = asyncHandler(async (req, res, next) => {
//     await executeQuery(`query ListMessages {
//       listMessages {
//         items {
//           createdAt
//           id
//           message
//           name
//           updatedAt
//           userId1
//           userId2
//           username1
//           username2
//         }
//       }
//     }
//     `,  "listMessages", {}, req, res)
// })

exports.message_update = asyncHandler(async (req, res, next) => {
    await executeQuery(
        `mutation UpdateMessage($input: UpdateMessageInput!) {
            updateMessage(input: $input) {
                message
                name
            }
        }`,
        "updateMessage",
        {
            input: { id: req.params.id,
                ...req.body
            }
        },
        req, res
    );
})

exports.message_delete = asyncHandler(async (req, res, next) => {
    await executeQuery(
        `mutation DeleteMessage($id: ID!){
          deleteMessage(input: {id: $id}) {
            id
          }
        }
        `,
        "deleteMessage",
        {id: req.params.id},
        req, res);
})