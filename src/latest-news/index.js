import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ColorPalette, TextControl, Spinner } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

registerBlockType("create-block/latest-news", {
	title: "Latest News Block",
	category: "seedx_blocks",
	icon: "list-view",
	attributes: {
		titleColor: { type: "string", default: "#000000" },
		numPosts: { type: "number", default: 5 },
		featuredPostId: { type: "number" }
	},
	edit: ({ attributes, setAttributes }) => {
		const { titleColor, numPosts, featuredPostId } = attributes;
		const posts = useSelect((select) => {
			return select("core").getEntityRecords("postType", "post", { per_page: numPosts });
		}, [numPosts]);

		const blockProps = useBlockProps();
		const featuredPost = posts?.find(post => post.id === featuredPostId) || posts?.[0];
		const otherPosts = posts?.filter(post => post.id !== featuredPost?.id) || [];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title="Settings">
						<RangeControl
							label="Number of Posts"
							value={numPosts}
							onChange={(value) => setAttributes({ numPosts: value })}
							min={1}
							max={10}
						/>
						<TextControl
							label="Featured Post ID"
							value={featuredPostId || ""}
							type="number"
							onChange={(value) => setAttributes({ featuredPostId: parseInt(value) || null })}
						/>
						<ColorPalette
							label="Title Color"
							value={titleColor}
							onChange={(color) => setAttributes({ titleColor: color })}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps} className="latest-news-block container ">
					<h3 style={{ color: titleColor }}>Latest News</h3>
					{!posts ? <Spinner /> : (
						<div className="news-layout">
							{featuredPost && (
								<div className="featured-news">
									<h2>{featuredPost.title.rendered}</h2>
									<p dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}></p>
									<a href={featuredPost.link} target="_blank" rel="noopener noreferrer">Read more</a>
								</div>
							)}
							<div className="other-news">
								{otherPosts.map((post) => (
									<div key={post.id} className="news-item">
										<h4>{post.title.rendered}</h4>
										<a href={post.link} target="_blank" rel="noopener noreferrer">Read more</a>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</Fragment>
		);
	},
	save: () => {
		return null; // Dynamic block, rendering happens server-side
	},
});
