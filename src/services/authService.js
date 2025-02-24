const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
    async register(userData) {
        const { email, password, name, role = 'user' } = userData;

        let user = await User.findOne({ email });
        if (user) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            email,
            password: hashedPassword,
            name,
            role
        });

        await user.save();
        return { token: this.generateToken(user._id, user.role), user };
    }

    async login(credentials) {
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        return { token: this.generateToken(user._id, user.role), user };
    }

    generateToken(userId, role) {
        return jwt.sign(
            { userId, role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    }
}

module.exports = new AuthService(); 