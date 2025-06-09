import { Link } from 'react-router-dom';
import { UserHeader } from "@/components/UserHeader";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from 'react';
import { Home as HomeIcon } from 'lucide-react';

// import Logo from "./logo.svg";
// import ReactLogo from "./react.svg";

export default function Header() {

	return <>
		<NavigationMenu viewport={false} orientation={"horizontal"}>
			<NavigationMenuList>
					<NavigationMenuLink>
						<Link to="/">
							<HomeIcon></HomeIcon>
						</Link>
					</NavigationMenuLink>
				{/* <NavigationMenuItem>
				</NavigationMenuItem> */}
				<UserHeader />
			</NavigationMenuList>
		</NavigationMenu>
	</>;
};