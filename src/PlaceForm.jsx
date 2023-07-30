export default function PlaceForm() {
  const title = "Add a Place";

  return (
    <>
      <h1>{title}</h1>
      <form id="place-form">
        <div class="container-fluid">
          <div class="row mb-4">
            <div class="col-lg-8">
              <label
                className="form-label"
                for="name">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                required
              />
            </div>
            <div className="col-lg-4">
              <label
                for="rating"
                className="form-label">
                Rating
              </label>
              <select
                className="form-select"
                id="rating"
                required>
                <option></option>
                {[...Array(10).keys()].map((key) => (
                  <option value={key + 1}>{key + 1}</option>
                ))}
              </select>
            </div>
          </div>
          {/* TODO: Category select */}
          {/* TODO: list existing notes with X to remove */}
          <div className="row mb-4">
            <div className="col">
              <label
                className="form-label"
                for="note">
                Note
              </label>
              <textarea
                className="form-control"
                rows="3"
                id="note"></textarea>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
