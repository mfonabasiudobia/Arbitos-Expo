import CartIcon from '/assets/svg/cart.svg';
import DeleteIcon from '/assets/svg/delete.svg';
import NotificationIcon from '/assets/svg/notification.svg';
import TransactionReceiptIcon from '/assets/svg/transaction-receipt.svg';

export const data = [
  {
    title: 'Notifications',
    Icon: NotificationIcon,
    routeName: 'Notification',
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
    title: 'Delete Account',
    Icon: DeleteIcon,
    routeName: 'DeleteAccount',
  },

];