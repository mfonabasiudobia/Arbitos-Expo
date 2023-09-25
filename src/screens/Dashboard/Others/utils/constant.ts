import AboutUsIcon from '/assets/svg/about-us.svg';
import CartIcon from '/assets/svg/cart.svg';
import DoubleUserIcon from '/assets/svg/double-user.svg';
import ReferralIcon from '/assets/svg/referrals.svg';
import SignOutIcon from '/assets/svg/signout.svg';
import TransactionReceiptIcon from '/assets/svg/transaction-receipt.svg';
import UserIcon from '/assets/svg/user.svg';

export const data = [
  {
    title: 'My Profile',
    Icon: UserIcon,
    routeName: 'Profile',
  },
  {
    title: 'My Cart',
    Icon: DoubleUserIcon,
    routeName: 'Cart',
  },
  {
    title: 'Become Our Marketer',
    Icon: DoubleUserIcon,
    routeName: 'BecomeOurMarketer',
  },
    {
    title: 'Order History',
    Icon: CartIcon,
    routeName: 'OrderHistory',
  },
   {
    title: 'Withdrawal History',
    Icon: TransactionReceiptIcon,
    routeName: 'WithdrawalHistory',
  },
  {
    title: 'Transaction History',
    Icon: TransactionReceiptIcon,
    routeName: 'TransactionHistory',
  },
  {
    title: 'My Company Info',
    Icon: AboutUsIcon,
    routeName: 'MyCompanyInfo',
  },
  {
    title: 'About Us',
    Icon: AboutUsIcon,
    routeName: 'AboutUs',
  },
  {
    title: 'My Referral',
    Icon: ReferralIcon,
    routeName: 'Referral',
  },
  {
    title: 'Sign Out',
    Icon: SignOutIcon,
  },
];