import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews/review-list';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import { Offers, Points } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { fetchOfferDataAction } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { AuthorizationStatus, PAGINATION } from '../../const/const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { selectCurrentOfferData } from '../../store/selectors';
import AddToFavouritesButton from '../../components/add-to-favorites/add-to-favorites';
import PlacesCardList from '../../components/place-cards/place-card-list';
import NotFoundPage from '../not-found-page/not-found-page';

type OfferProps = {
  favorites: Offers;
};
function OfferPage({ favorites }: OfferProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const user = useAppSelector(getAuthorizationStatus);
  const { offerInfo, nearestOffers, reviews } = useAppSelector(
    selectCurrentOfferData
  );

  const points: Points = nearestOffers.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const mapPoints: Points = points.slice(0, PAGINATION.nearbyPointsLimit);

  if (offerInfo) {
    mapPoints.push({
      id: offerInfo.id,
      location: offerInfo.location,
    });
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOfferDataAction({ id: id ?? '' }))
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!offerInfo) {
    return (
      <div className="container">
        <NotFoundPage />
      </div>
    );
  }

  return (
    <div className="page">
      <Header favorites={favorites} />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerInfo.images.map((url) => (
                <div className="offer__image-wrapper" key={url}>
                  <img
                    className="offer__image"
                    src={url}
                    alt={offerInfo.title}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerInfo.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offerInfo.title}</h1>
                <AddToFavouritesButton
                  id={offerInfo.id}
                  isFavorite={offerInfo.isFavorite}
                  width="31"
                  heigth="33"
                  buttonClass="offer__bookmark-button"
                  activeClass="offer__bookmark-button--active"
                  iconClass="offer__bookmark-icon"
                  buttonText="In bookmarks"
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${Math.round(offerInfo.rating) * 20}%` }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offerInfo.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerInfo.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${offerInfo.bedrooms} ${
                    offerInfo.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'
                  }`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${offerInfo.maxAdults} ${
                    offerInfo.maxAdults === 1 ? 'adult' : 'Adults'
                  }`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerInfo.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerInfo.goods.map((advantage) => (
                    <li className="offer__inside-item" key={advantage}>
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      offerInfo.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offerInfo.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offerInfo.host.name}
                  </span>
                  {offerInfo.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerInfo.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {user === AuthorizationStatus.Auth && <CommentForm id={id!} />}
              </section>
            </div>
          </div>

          <section className="offer__map map">
            {nearestOffers && nearestOffers.length > 0 && (
              <Map
                city={nearestOffers[0].city}
                points={mapPoints}
                specialCaseId={offerInfo.id}
              />
            )}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <PlacesCardList
              offers={nearestOffers.slice(0, PAGINATION.nearbyPointsLimit)}
              typeOfList={'typical'}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferPage;
