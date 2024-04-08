"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.getServerAuthSession = exports.authOptions = void 0;
const prisma_adapter_1 = require("@next-auth/prisma-adapter");
const next_auth_1 = require("next-auth");
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("@/env");
const db_1 = require("@/server/db");
const navigation_1 = require("next/navigation");
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
exports.authOptions = {
    callbacks: {
        session: async ({ session, token }) => {
            session.user = token.user;
            return Promise.resolve(session);
        },
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return Promise.resolve(token);
        },
    },
    session: {
        strategy: "jwt",
    },
    adapter: (0, prisma_adapter_1.PrismaAdapter)(db_1.db),
    pages: {
        signIn: "/login",
        signOut: "/",
    },
    providers: [
        (0, credentials_1.default)({
            // id: "credentials",
            name: "Credentials",
            credentials: {
                username: {
                    label: "username",
                    type: "username",
                    required: true,
                },
                password: {
                    label: "password",
                    type: "password",
                    required: true,
                },
            },
            // @ts-expect-error Out of my hand, the maintainers of NextAuth should solve this TypeScript error
            async authorize(credentials, _) {
                // Add logic here to look up the user from the credentials supplied
                console.log(credentials);
                if (!credentials)
                    return null;
                if (env_1.env.ADMIN_USERNAME === credentials.username &&
                    env_1.env.ADMIN_PASSWORD === credentials.password)
                    return {
                        username: "admin",
                        id: "0",
                        role: "admin",
                        image: "/avatars/admin.jpg",
                        firstName: "The",
                        lastName: "Admin",
                    };
                try {
                    const user = await db_1.db.user.findUnique({
                        where: {
                            username: credentials.username,
                        },
                    });
                    if (!user)
                        throw new Error("Invalid username");
                    const isCorrectPassword = await bcrypt_1.default.compare(credentials.password, user.password);
                    if (!isCorrectPassword)
                        throw new Error("Invalid password");
                    if (user.role === "instructor" && !user.isActive)
                        throw new Error("Invalid username");
                    const result = {
                        username: user.username,
                        id: user.id,
                        role: user.role,
                        image: user.image,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    };
                    return result;
                }
                catch (err) {
                    throw new Error("Invalid username");
                }
            },
        }),
    ],
};
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
const getServerAuthSession = () => (0, next_auth_1.getServerSession)(exports.authOptions);
exports.getServerAuthSession = getServerAuthSession;
const adminOnly = async () => {
    const session = await (0, exports.getServerAuthSession)();
    if (!session)
        (0, navigation_1.redirect)("/");
    if (session.user.role !== "admin")
        (0, navigation_1.redirect)("/workspace");
};
exports.adminOnly = adminOnly;
