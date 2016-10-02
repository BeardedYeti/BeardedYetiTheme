<?php
/**
 * Template part for displaying single posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package beardedyeti
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

		<div class="entry-meta">
			<?php beardedyeti_posted_on(); ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<!--post thumbnal options-->
	<?php
	if( has_post_thumbnail( ) ){
		?>
		<div class="single-feat clearfix">
			<figure class="single-thumb single-thumb-full">
				<?php
				$thumbnail = 'full';
				the_post_thumbnail( $thumbnail );
				?>
			</figure>
		</div><!-- .single-feat-->
	<?php
	}
	?>
	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'beardedyeti' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php beardedyeti_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->