import { Wallet, BanknoteArrowUp, BanknoteArrowDown, PiggyBank, TrendingUp } from 'lucide-react';


const card = [
  {
    title: "Total Balance",
    icon: <Wallet color='red' />,
    trendingIcon: <TrendingUp color='green' />,
    value: "₱1.000,00"
  },
  {
    title: "Income (This Month)",
    icon: <BanknoteArrowDown color='green' />,
    trendingIcon: <TrendingUp color='green' />,
    value: "₱1.000,00"
  },
  {
    title: "Expenses (This Month)",
    icon: <BanknoteArrowUp color='red' />,
    trendingIcon: <TrendingUp color='red' />,
    value: "₱1.000,00"
  },
  {
    title: "Net Savings",
    icon: <PiggyBank color='purple' />,
    trendingIcon: <TrendingUp color='green' />,
    value: "₱1.000,00"
  }
]


export default function Page() {
  return (
    <div className="w-full mt-3 grid justify-center items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] text-white gap-2">

      {card.map((item, index) => (
        <div key={index} className="w-full bg-[#1D1816] p-2 flex items-start flex-col rounded-[10px] gap-2 animate-slide-up">
          <div className="flex items-center gap-2">
            {item.icon}
            <p className='text-xs'>{item.title}</p>
          </div>
          <div className='flex items-center justify-center w-full flex-col gap-2'>
            <p className='text-center'>{item.value}</p>
            <div className='flex items-center gap-2 text-sm'>
              {item.trendingIcon}
              <p>8.5% from last month</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}