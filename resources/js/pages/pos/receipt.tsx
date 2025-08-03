import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface SaleItem {
    id: number;
    product_name: string;
    product_sku: string;
    unit_price: number;
    quantity: number;
    discount_amount: number;
    total_price: number;
}

interface Sale {
    id: number;
    sale_number: string;
    subtotal: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
    amount_paid: number;
    change_amount: number;
    payment_methods: Array<{ method: string; amount: number }>;
    sale_date: string;
    customer?: {
        name: string;
        email?: string;
        phone?: string;
    };
    store: {
        name: string;
        address: string;
        phone?: string;
        email?: string;
    };
    cashier: {
        name: string;
    };
    items: SaleItem[];
}

interface Props {
    sale: Sale;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'POS',
        href: '/pos',
    },
    {
        title: 'Receipt',
        href: '#',
    },
];

export default function POSReceipt({ sale }: Props) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Receipt - ${sale.sale_number}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex justify-between items-center print:hidden">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🧾 Receipt</h1>
                    <div className="flex space-x-3">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            🖨️ Print Receipt
                        </button>
                        <Link
                            href={route('pos.index')}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            🏪 New Sale
                        </Link>
                    </div>
                </div>

                {/* Receipt */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md mx-auto w-full print:shadow-none print:max-w-none">
                    {/* Store Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{sale.store.name}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{sale.store.address}</p>
                        {sale.store.phone && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">📞 {sale.store.phone}</p>
                        )}
                        {sale.store.email && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">✉️ {sale.store.email}</p>
                        )}
                    </div>

                    <div className="border-t border-b border-gray-300 dark:border-gray-600 py-4 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Receipt #</span>
                            <span className="font-mono text-gray-900 dark:text-white">{sale.sale_number}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Date</span>
                            <span className="text-gray-900 dark:text-white">
                                {new Date(sale.sale_date).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Cashier</span>
                            <span className="text-gray-900 dark:text-white">{sale.cashier.name}</span>
                        </div>
                        {sale.customer && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Customer</span>
                                <span className="text-gray-900 dark:text-white">{sale.customer.name}</span>
                            </div>
                        )}
                    </div>

                    {/* Items */}
                    <div className="mb-4">
                        {sale.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white text-sm">{item.product_name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {item.product_sku}</p>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>{item.quantity} × ${item.unit_price.toFixed(2)}</span>
                                        {item.discount_amount > 0 && (
                                            <span className="ml-2 text-red-500">(-${item.discount_amount.toFixed(2)})</span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-white">
                                        ${item.total_price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="text-gray-900 dark:text-white">${sale.subtotal.toFixed(2)}</span>
                            </div>
                            
                            {sale.discount_amount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Discount</span>
                                    <span className="text-red-600">-${sale.discount_amount.toFixed(2)}</span>
                                </div>
                            )}
                            
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                                <span className="text-gray-900 dark:text-white">${sale.tax_amount.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex justify-between text-lg font-bold border-t border-gray-300 dark:border-gray-600 pt-2">
                                <span className="text-gray-900 dark:text-white">Total</span>
                                <span className="text-gray-900 dark:text-white">${sale.total_amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mt-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Payment Details</h4>
                        {sale.payment_methods.map((payment, index) => (
                            <div key={index} className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400 capitalize">
                                    {payment.method.replace('_', ' ')}
                                </span>
                                <span className="text-gray-900 dark:text-white">${payment.amount.toFixed(2)}</span>
                            </div>
                        ))}
                        
                        <div className="flex justify-between text-sm font-medium mt-2">
                            <span className="text-gray-600 dark:text-gray-400">Amount Paid</span>
                            <span className="text-gray-900 dark:text-white">${sale.amount_paid.toFixed(2)}</span>
                        </div>
                        
                        {sale.change_amount > 0 && (
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-600 dark:text-gray-400">Change</span>
                                <span className="text-green-600">${sale.change_amount.toFixed(2)}</span>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 pt-4 border-t border-gray-300 dark:border-gray-600">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Thank you for your business!</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            🎉 Visit us again soon!
                        </p>
                        {sale.customer && (
                            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                                <p className="text-xs text-blue-600 dark:text-blue-400">
                                    💎 Loyalty points will be added to your account
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg text-center print:hidden">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                        ✅ Sale Completed Successfully!
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                        Receipt #{sale.sale_number} has been generated. You can print it or start a new sale.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}