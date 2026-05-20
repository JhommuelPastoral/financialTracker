import React from 'react';
import { 
  Wallet, 
  Banknote, 
  PiggyBank, 
  TrendingUp, 
  TrendingDown,
  CreditCard
} from 'lucide-react';
import IncomeExpenses from './_components/income-expenses-chart';
type CardData = {
  title: string;
  icon: React.JSX.Element;
  value: string;
  trendValue: string;
  isPositive: boolean;
};

const cards: CardData[] = [
  {
    title: "Total Balance",
    icon: <Wallet className="w-5 h-5 text-blue-400" />,
    value: "1,000.00",
    trendValue: "8.5%",
    isPositive: true
  },
  {
    title: "Income (This Month)",
    icon: <Banknote className="w-5 h-5 text-emerald-400" />,
    value: "1,000.00",
    trendValue: "12.3%",
    isPositive: true
  },
  {
    title: "Expenses (This Month)",
    icon: <CreditCard className="w-5 h-5 text-rose-400" />,
    value: "1,000.00",
    trendValue: "4.1%",
    isPositive: false
  },
  {
    title: "Net Savings",
    icon: <PiggyBank className="w-5 h-5 text-purple-400" />,
    value: "1,000.00",
    trendValue: "2.4%",
    isPositive: true
  }
];

export default function Page() {
  return (
    <>
      <div className="w-full mt-6 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 text-white">
        {cards.map((item, index) => (
          <div 
            key={index} 
            className="w-full bg-[#1D1816] border border-white/5 p-5 flex flex-col rounded-2xl gap-4 shadow-lg hover:bg-[#251e1b] transition-colors animate-slide-up"
          >
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-400">{item.title}</p>
              <div className="p-2 bg-white/5 rounded-lg">
                {item.icon}
              </div>
            </div>

            {/* Value & Trend Row */}
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-1">
                <span className="text-lg text-neutral-500 font-semibold">₱</span>
                <span className="text-3xl font-bold tracking-tight">{item.value}</span>
              </div>
              
              <div className="flex items-center gap-1.5 mt-1">
                <div className={`flex items-center gap-1 text-sm font-medium ${item.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{item.trendValue}</span>
                </div>
                <span className="text-sm text-neutral-500">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mt-6 grid md:grid-cols-2 gap-4 text-white">
        <section className=''>
          <IncomeExpenses />
        </section>
        <section className='border-2'></section>
      </div>
    </>
  );
}