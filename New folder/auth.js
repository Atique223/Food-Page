// Authentication Management System for FoodRush

class AuthManager {
    constructor() {
        // Simulated user database
        this.users = [];
        this.currentUser = null;
    }

    // User Registration
    register(email, password, name) {
        // Check if user already exists
        if (this.users.some(user => user.email === email)) {
            return { 
                success: false, 
                message: 'User already exists' 
            };
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            email,
            password: this.hashPassword(password),
            name,
            createdAt: new Date()
        };

        this.users.push(newUser);
        return { 
            success: true, 
            message: 'Registration successful',
            user: { 
                id: newUser.id, 
                email: newUser.email, 
                name: newUser.name 
            }
        };
    }

    // User Login
    login(email, password) {
        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            return { 
                success: false, 
                message: 'User not found' 
            };
        }

        if (this.verifyPassword(password, user.password)) {
            this.currentUser = user;
            return { 
                success: true, 
                message: 'Login successful',
                user: { 
                    id: user.id, 
                    email: user.email, 
                    name: user.name 
                }
            };
        }

        return { 
            success: false, 
            message: 'Invalid password' 
        };
    }

    // Google Sign-In
    googleSignIn(googleUser) {
        const { email, name, picture } = googleUser;

        // Check if user exists, if not, create
        let user = this.users.find(u => u.email === email);
        
        if (!user) {
            user = {
                id: this.users.length + 1,
                email,
                name,
                profilePicture: picture,
                createdAt: new Date(),
                loginMethod: 'google'
            };
            this.users.push(user);
        }

        this.currentUser = user;
        return { 
            success: true, 
            message: 'Google Sign-In successful',
            user: { 
                id: user.id, 
                email: user.email, 
                name: user.name,
                profilePicture: user.profilePicture
            }
        };
    }

    // Logout
    logout() {
        this.currentUser = null;
        return { 
            success: true, 
            message: 'Logged out successfully' 
        };
    }

    // Password Hashing (simplified)
    hashPassword(password) {
        // In a real app, use a secure hashing method
        return btoa(password);
    }

    // Password Verification (simplified)
    verifyPassword(inputPassword, storedPassword) {
        return btoa(inputPassword) === storedPassword;
    }

    // Get Current User
    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize AuthManager
const authManager = new AuthManager();

// Expose methods globally
window.authManager = authManager;
