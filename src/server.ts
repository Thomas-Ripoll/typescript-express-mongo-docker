
import App from './App';
import PostController from './Controller/PostController';

const app = new App(
    [
        new PostController()
    ]
);

app.run();