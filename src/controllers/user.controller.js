import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import UserServices from '../services/user.services.js';

const userService = new UserServices();

export default class UserController {
  async register(req, res, next) {
    console.log(req.body);
    try {
      const user = await userService.register(req.body);
      console.log(user);
      if (user !== null && user !== false) {
        res.redirect("/");
      } else {
        res.redirect("/views/register-error");
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      console.log('Datos recibidos en el formulario:', { email, password });

      const user = await User.findOne({ email });

        if (!user) {
          console.log('Usuario no encontrado');
          return res.status(401).json({ msg: "Usuario no encontrado" });
        }
  
        console.log('Contraseña almacenada en la base de datos:', user.password);
        
        const cleanPassword = password.trim();

        const passwordMatch = cleanPassword === user.password;
        console.log('Coincide la contraseña:', passwordMatch);

        if (passwordMatch) {
          console.log('Inicio de sesión exitoso como administrador');
          req.session.user = {
            loggedIn: true,
            username: user.email,
            role: user.email === 'adminCoder@coder.com' ? 'admin' : 'usuario',
          };
//          res.redirect('/api/products');
          res.redirect('/views/realtimeproducts');
        } else {
          console.log('Credenciales incorrectas');
          res.status(401).json({ msg: "Credenciales incorrectas" });
        }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      res.status(500).json({ msg: "Error en la autenticación" });
    }
  };

  async visit(req, res) {
    req.session.user.count = req.session.user.count ? req.session.user.count +1 : 1;
    res.json({
      msg: `${req.session.user.username} ha visitado el sitio ${req.session.user.count} veces`,
    });
  };

  async logout(req, res) {
    req.session.destroy((err) => {
      if (!err) res.send("Logout ok!");
      else res.send({ status: "Logout ERROR", body: err });
    });
  };

  async infoSession(req, res) {
    res.send({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies,
    });
  }

  async showRegisterForm(req, res) {
    res.render('register');
  }

  async showProfile(req, res) {
    const user = req.session.user;
    res.render('profile', { user });
  }

  async showLoginForm(req, res) {
    res.render('login');
  }
}