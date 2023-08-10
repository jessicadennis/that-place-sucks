type ModalProps = {
  children: any;
  headerText: string;
  buttonClass: string;
  buttonLabel: string;
  onSubmit: (args: any) => void;
};

export default function Modal({
  children,
  headerText,
  buttonClass,
  buttonLabel,
  onSubmit,
}: ModalProps) {
  return (
    <>
      <button
        className={buttonClass}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#component-modal">
        {buttonLabel}
      </button>
      <div
        className="modal fade"
        id="component-modal"
        data-bs-backdrop="static">
        <div className="modal-dialog bg-body-tertiary">
          <div className="modal-header">
            <h1 className="modal-title">{headerText}</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
