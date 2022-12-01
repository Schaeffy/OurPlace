import './About.css'

const AboutPage = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h3>About Us</h3>
                <div className='about-us-body'>
                    OurPlace is a project created in part to encapsulate a bit of the past and allow others to experience a social networking site that held such fond memories for so many.
                    <br />
                    <br />
                    Whether you used MySpace growing up or simply heard about it, this is a place for you to experience it anew.
                    <br />
                    <br />
                    OurPlace is being continually updated and improved upon, so please check back often to see what's new!
                    <br />
                    <br />
                    Check out the <a id='github' href="https://github.com/schaeffy/OurPlace">GitHub</a> for more information including features to come!
                </div>
                <div className='thanks'>
                    <h3>Thanks again!</h3>
                    <img id='thanks' src="https://i.imgur.com/uD3VURf.png" alt="your dev" />
                </div>

            </div>
        </div>
    );
}

export default AboutPage;
