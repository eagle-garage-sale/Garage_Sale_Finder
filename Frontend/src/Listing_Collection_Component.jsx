import ShowListing from "./Listing_Component";

export default function ListingCollection({sales}) {

    return (
        <div>
        {sales.map((item)=> {
            return (
                <ShowListing
                    key={item.id}
                    {...item} />
            );
        })}
        </div>

    );
   

}