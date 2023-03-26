import { PassportStrategy } from '@nestjs/passport';
import {Strategy} from "passport-jwt";
export class AdminJwtStratagy extends PassportStrategy(Strategy) {

}