// ========================== nest ===================================
import {
  applyDecorators,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";

// ========================== enums ==================================

// ========================== custom guards ==========================
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";

/*  
AuthPermissionsGuard set metadata such as 'permissions' 
  and calls two guards - JwtAuthGuard and RolesGuard.  
*/

export function AuthPermissionsGuard() {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard));
}
