import { AvatarGenerator } from 'random-avatar-generator';

const generator = new AvatarGenerator();

export const getRandomAvatarUrl = () => generator.generateRandomAvatar();

export const emailRegExCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;