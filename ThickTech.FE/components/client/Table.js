export default function Table(props) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {props.children?.[0]?.props?.children?.map((th, index) => (
            <th
              key={index}
              className="text-left uppercase text-gray-400 font-semibold text-xs"
            >
              {th.props?.children}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.children?.slice(1)?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.props?.children?.map((td, tdIndex) => (
              <td key={tdIndex} className="border-t border-gray-200">
                {td.props?.children}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
