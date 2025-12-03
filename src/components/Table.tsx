const Table = () => {
  return (
    <div className="relative overflow-x-auto bg-white shadow-xs rounded-2xl">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body border-b border-gray-300">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Product name
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Color
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Category
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Price
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className=" border-b border-gray-300 hover:bg-gray-100">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-heading whitespace-nowrap"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium text-fg-brand hover:underline">
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
