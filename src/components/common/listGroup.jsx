const ListGroup = ({ items, onItemSelect, selectedItem }) => {
	return (
		<ul className="list-group">
			{items.map((item) => (
				<li
					onClick={() => onItemSelect(item)}
					key={item._id}
					className={selectedItem === item ? 'list-group-item active' : 'list-group-item'}
				>
					{item.name}
				</li>
			))}
		</ul>
	);
};

export default ListGroup;
