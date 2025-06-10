import { Link } from 'react-router-dom';
import { UserHeader } from "@/components/UserHeader";
import { cn } from '@/lib/utils';
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
import { Home as HomeIcon } from 'lucide-react';

export default function Header() {

	return <header>
		<NavigationMenu viewport={true} orientation={"horizontal"}>
			<NavigationMenuList>
				<NavigationMenuLink asChild>
					<Link to="/">
						<HomeIcon></HomeIcon>
					</Link>
				</NavigationMenuLink>
				<UserHeader />
			</NavigationMenuList>
		</NavigationMenu>
	</header>;
};