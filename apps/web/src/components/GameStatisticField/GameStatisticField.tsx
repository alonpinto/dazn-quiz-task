interface GameStatisticFieldProps {
  title: string;
  value: string | number | undefined;
}

const GameStatisticField = ({ title, value }: GameStatisticFieldProps) => (
  <tr>
    <td className="font-semibold border border-slate-300 text-left p-2">
      {title}
    </td>
    <td className="border border-slate-300 p-2">{value}</td>
  </tr>
);

export default GameStatisticField;
