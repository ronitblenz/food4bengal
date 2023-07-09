import styles from "./homePage.module.css";
import { BiSearch } from "react-icons/bi";
import { RiArrowRightSLine } from "react-icons/ri";

import NGOCard from "../../components/NGOCard";
import BottomNavbar from "../../components/BottomNavbar";

import { Link } from "react-router-dom";

const campaignImages = [
  {
    id: 1,
    img: "https://thumbs.dreamstime.com/z/meal-food-donation-app-smartphone-volunteering-charity-concept-covid-solidarity-response-181880570.jpg"
  },
  {
    id: 2,
    img: "https://media.istockphoto.com/vectors/food-donation-and-charity-vector-id1224414210?k=20&m=1224414210&s=612x612&w=0&h=FhZYeea62Eh_7OM74djnSdkRBSq0kpeloV3SnyTiSpE="
  },
  {
    id: 3,
    img: "https://i.pinimg.com/originals/5d/83/88/5d8388343a60c402a84a687e8ad44eae.jpg"
  },
  {
    id: 4,
    img: "https://www.wfp.org/sites/default/files/images/news/StopTheWaste%20Press%20Release%20Image.png"
  },
  {
    id: 5,
    img: "https://previews.123rf.com/images/arrow/arrow1712/arrow171200010/91915955-food-drive-donation-give-today-campaign.jpg"
  },
  {
    id: 6,
    img: "https://c8.alamy.com/comp/2BM08C6/meal-and-food-donation-app-on-a-smartphone-volunteering-and-charity-concept-2BM08C6.jpg"
  }
];

const HomePage = ({ data }) => {

  return (
    <>
      <BottomNavbar />
      <div className={styles.main}>
        <div className={styles.main_top}>
          <div className={styles.search_input}>
            <BiSearch className={styles.search_icon} />
            <input
              className={styles.input}
              type="text"
              placeholder="Search for NGO or campaign"
            />
          </div>
        </div>

        <div className={styles.volunteer_images}>
          <div className={styles.top}>
            <h3>Volunteer Required</h3>
            <Link to="/all">
              <div className={styles.see_all}>
                <p>See all</p>
                <RiArrowRightSLine className={styles.search_icon} />
              </div>
            </Link>
          </div>
          <div className={styles.round_images}>
            {data.map((el) => {
              return (
                <Link to={`/all/${el._id}`}>
                  <img
                    key={el._id}
                    className={styles.round_image}
                    src={el.image}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.food_required_section}>
          <div className={styles.food_required_top}>
            <h3>Food Required</h3>
            <Link to="/all">
              <div className={styles.see_all}>
                <p>See all</p>
                <RiArrowRightSLine className={styles.search_icon} />
              </div>
            </Link>
          </div>
          <Link to={`all/${data[0]._id}`}>
            <NGOCard data={data[0]} />
          </Link>
          <Link to={`all/${data[2]._id}`}>
            <NGOCard data={data[2]} />
          </Link>
          <Link to={`all/${data[7]._id}`}>
            <NGOCard data={data[7]} />
          </Link>
        </div>
        <div className={styles.upcoming_campaigns}>
          <div className={styles.top}>
            <h3>Upcoming Campaigns</h3>
            <div className={styles.see_all}>
              <p>See all</p>
              <RiArrowRightSLine className={styles.search_icon} />
            </div>
          </div>
          <div className={styles.round_images}>
            {campaignImages.map((el) => {
              return (
                <img
                  key={el.id}
                  className={styles.campaign_image}
                  src={el.img}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.food_required_section}>
          <div className={styles.food_required_top}>
            <h3>Nearby NGO</h3>
            <div className={styles.see_all}>
              <p>See all</p>
              <RiArrowRightSLine className={styles.search_icon} />
            </div>
          </div>
          <div className={styles.nearby_images}>
            <Link to={`all/${data[0]._id}`}>
              <img className={styles.nearby_image} src={data[0]?.image} />
            </Link>
            <Link to={`all/${data[1]._id}`}>
              <img className={styles.nearby_image} src={data[1]?.image} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
