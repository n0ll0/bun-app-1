import { useEffect, useState, type JSX } from "react";
import { Link } from 'react-router-dom';
import type { User } from '@/db/types';

import {
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { User as UserIcon } from 'lucide-react';
import { useAuthToken } from "./AuthContext";
import { cn } from "@/lib/utils";

export function UserHeader() {
	const { user, logout } = useAuthToken();
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>
				<UserIcon />
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				{
					!user ? (
						<NavigationMenuLink asChild>
							<Link to="/auth">Login/Register</Link>
						</NavigationMenuLink>
					) : (
						<>
							<NavigationMenuLink asChild>
								<Link to="/profile">Edit Profile</Link>
							</NavigationMenuLink>
							<NavigationMenuLink className={cn("cursor-pointer")} onClick={logout}>Logout</NavigationMenuLink>
						</>
					)
				}
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}
