import { IncomingMessage, ServerResponse } from "http";
import { UserController } from "../controllers/UserController";
import { PostController } from "../controllers/PostController";
import { CommentController } from "../controllers/CommentController";
import { bodyParser } from "../helpers/bodyParserHelper";
import { responseHeaders } from "../helpers/corsHelper";

const routeManager = async (request: IncomingMessage, response: ServerResponse) => {
  request.on('error', err => prepareResponse(Promise.reject(err.message), 200, 500));
  
  const { url } = request;
  
  let hasRouteBeenFound = false;

  const prepareResponse = (data: Promise<any>, successStatus: number, errorStatus: number) => {
    data
      .then(([rows, fields]) => {
        response.writeHead(successStatus, responseHeaders());
        response.end(JSON.stringify(rows));
      })
      .catch((errorMessage) => {
        response.writeHead(errorStatus, responseHeaders());
        response.end(`Error message: ${errorMessage}`);
      });
  }

  // GET USERS
  if (url === '/get-users') {
    hasRouteBeenFound = true;
    const allUsers = UserController.getAllUsers();
    prepareResponse(allUsers, 200, 404);
  }

  // GET USER
  if ((url as string).includes('/get-user/')) {
    hasRouteBeenFound = true;
    const user = UserController.getUser((url as string));
    prepareResponse(user, 200, 404);
  }

  // CREATE USER
  if (url === '/post-user') {
    hasRouteBeenFound = true;
    const parsedBody = await bodyParser(request);
    const queryInfo = UserController.createUser(parsedBody);
    prepareResponse(queryInfo, 201, 400);
  }

  // UPDATE USER
  if ((url as string).includes('/put-user/')) {
    hasRouteBeenFound = true;
    const parsedBody = await bodyParser(request);
    const queryInfo = UserController.updateUser(parsedBody, (url as string));
    prepareResponse(queryInfo, 200, 400);
  }

  // DELETE USER
  if ((url as string).includes('/delete-user/')) {
    hasRouteBeenFound = true;
    const queryInfo = UserController.deleteUser((url as string));
    prepareResponse(queryInfo, 200, 400);
  }

  // GET POSTS
  if ((url as string).includes('/get-posts?userId')) {
    hasRouteBeenFound = true;
    const allUserPosts = PostController.getAllUserPosts((url as string));
    prepareResponse(allUserPosts, 200, 404);
  }

  // GET POST
  if ((url as string).includes('/get-post/')) {
    hasRouteBeenFound = true;
    const post = PostController.getPost((url as string));
    prepareResponse(post, 200, 404);
  }

  // CREATE POST
  if (url === '/post-post') {
    hasRouteBeenFound = true;
    const parsedBody = await bodyParser(request);
    const queryInfo = PostController.createPost(parsedBody);
    prepareResponse(queryInfo, 201, 400);
  }

  // UPDATE POST
  if ((url as string).includes('/put-post/')) {
    hasRouteBeenFound = true;
    const parsedBody = await bodyParser(request);
    const queryInfo = PostController.updatePost(parsedBody, (url as string));
    prepareResponse(queryInfo, 200, 400);
  }

  // DELETE POST
  if ((url as string).includes('/delete-post/')) {
    hasRouteBeenFound = true;
    const queryInfo = PostController.deletePost((url as string));
    prepareResponse(queryInfo, 200, 400);
  }

  // GET COMMENTS
  if ((url as string).includes('/get-comments?postId')) {
    hasRouteBeenFound = true;
    const allPostComments = CommentController.getAllPostComments((url as string));
    prepareResponse(allPostComments, 200, 404);
  }

  // GET COMMENT
  if ((url as string).includes('/get-comment/')) {
    hasRouteBeenFound = true;
    const post = CommentController.getComment((url as string));
    prepareResponse(post, 200, 404);
  }

  // CREATE COMMENT
  if (url === '/post-comment') {
    hasRouteBeenFound = true;
    const parsedBody = await bodyParser(request);
    const queryInfo = CommentController.createComment(parsedBody);
    prepareResponse(queryInfo, 201, 400);
  }

  // UPDATE COMMENT
  if ((url as string).includes('/put-comment/')) {
    hasRouteBeenFound = true;
    const parsedBody = await bodyParser(request);
    const queryInfo = CommentController.updateComment(parsedBody, (url as string));
    prepareResponse(queryInfo, 200, 400);
  }

  // DELETE COMMENT
  if ((url as string).includes('/delete-comment/')) {
    hasRouteBeenFound = true;
    const queryInfo = CommentController.deleteComment((url as string));
    prepareResponse(queryInfo, 200, 400);
  }

  if (!hasRouteBeenFound) {
    prepareResponse(Promise.reject('Source not found'), 200, 404)
  }
}

export default routeManager;