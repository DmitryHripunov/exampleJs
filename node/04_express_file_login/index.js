
const express = require('express');
const nunjucks = require('nunjucks');
const multer = require('multer');
const basicAuth = require('express-basic-auth');
const { nanoid } = require('nanoid');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// const cors = require('cors');
// const csurf = require('csurf');
// const helmet = require('helmet');

const fs = require('fs').promises;
const patch = require('path');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

const uploadsDir = patch.join(__dirname, 'public', 'uploads');

const DB = {
  users: [
    { _id: nanoid(), username: 'admin', password: 'admin', books: 0 }
  ],
  sessions: {},
};

const findUserByUserName = async username => DB.users.find(u => u.username === username);

const findUserBySessionId = async sessionId => {
  const userId = DB.sessions[sessionId];
  if (!userId) return;

  return DB.users.find((u) => u._id === userId);
}

const createSession = async userId => {
  const sessionId = nanoid();
  DB.sessions[sessionId] = userId;
  return sessionId;
};

const deleteSession = async sessionId => {
  delete DB.sessions[sessionId]
}

const auth = async (req, res, next) => {
  if (!req.cookies['sessionId']) {
    return next();
  };

  const user = await findUserBySessionId(req.cookies['sessionId']);

  req.user = user;
  req.sessionId = req.cookies['sessionId'];
  next();
};

app.set('view engine', 'njk');

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(compression());

// app.use(cors());
// app.use(csurf({ cookie: true }));
// app.use(helmet());

// const fileFilter = (req, res, cb) => {
//   cb(null, file.mimetype.match(/^image\//));
// }

const upload = multer({ dest: uploadsDir, limits: {
  fileSize: 10 * 1024 * 1024,
} });

let count = 0;

const uiKitCss = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.9.4/dist/css/uikit.min.css" />';

app.get('/', auth, async(req, res) => {
  const counts = [];
  const files = (await fs.readdir(uploadsDir)).sort().reverse();

  for (let i = 0; i < count; i++) {
    counts.push(99 - i);
  }

  res.render('index', {
    count,
    uiKitCss,
    counts,
    files,
    user: req.user,
    authError: req.query.authError === 'true', 
  })
});

app.post('/count', (req, res) => {
  const data = req.body.value
  count += data || 1;
  res.json({ count });
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.redirect('/');
});

app.post('/login', bodyParser.urlencoded({extended: false}), async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUserName(username);

  if (!user || user.password !== password) {
    return res.redirect('/?authError=true')
  }

  const sessionId = await createSession(user._id);
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    expires: 0,
  }).redirect('/')
});

app.post('/api/add-book', auth, async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const user = await findUserByUserName(req.user.username);

  user.books += 1;
  res.json({ books: user.books })
});

app.get('/logout', auth, async (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  await deleteSession(req.sessionId);
  res.clearCookie('sessionId').redirect('/')
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(` Listening on http://localhost:${port}`);
});