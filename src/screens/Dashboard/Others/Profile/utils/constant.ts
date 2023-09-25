import AboutUsIcon from '/assets/svg/about-us.svg';
import DoubleUserIcon from '/assets/svg/double-user.svg';
import SignOutIcon from '/assets/svg/signout.svg';
import UserIcon from '/assets/svg/user.svg';
import DarkmodeIcon from "/assets/svg/dark.svg";
import SettingIcon from "/assets/svg/setting.svg";
import WalletIcon from "/assets/svg/wallet.svg";
import LegalIcon from "/assets/svg/legal.svg";
import SupportIcon from "/assets/svg/support.svg";
import ShieldIcon from "/assets/svg/shield.svg";

export const data = [
    {
      "General Settings" : [
        {
          title: 'Settings',
          Icon: SettingIcon,
          routeName: 'Setting',
        },
        {
          title: 'Wallet Balance',
          Icon: WalletIcon,
          routeName: 'BecomeOurMarketer',
        },
        {
          title: 'Dark Mode',
          Icon: DarkmodeIcon,
          routeName: 'Home',
          isDarkMode: true,
        }
    ],
  },
   {
      "Account Settings" : [
        {
          title: 'Account Security',
          Icon: ShieldIcon,
          routeName: 'AccountSecurity',
        },
        {
          title: 'Legal',
          Icon: LegalIcon,
          routeName: 'Legal',
        },
        {
          title: 'Help & Support',
          Icon: SupportIcon,
          routeName: 'Support',
        },
         {
          title: 'Sign Out',
          Icon: SignOutIcon,
          routeName: 'Home',
        },
    ],
  }
];

